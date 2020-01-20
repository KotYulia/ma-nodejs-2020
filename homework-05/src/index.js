const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName);
const outputFile = path.join(process.cwd(), outputDirName, outputFileName);

async function getInputFileList() {
  try {
    const files = await fsp.readdir(inputDir);
    return files.map((file) => path.join(inputDir, file));
  } catch (error) {
    throw `Can't find any files in the ${inputDirName} directory`;
  }
}

async function getObjectFromFile(filePath) {
  let compressedBuffer;
  let jsonBuffer;

  try {
    compressedBuffer = await fsp.readFile(filePath);
  } catch (error) {
    throw `Can't read the file ${filePath}`;
  }

  try {
    jsonBuffer = await gunzip(compressedBuffer);
    const json = jsonBuffer.toString();
    const object = JSON.parse(json);
    return object;
  } catch (error) {
    throw 'Problems with decompress buffer';
  }
}

function rebuildUrl(originalUrl) {
  const url = new URL(originalUrl);
  const urlFileName = path.parse(originalUrl).name;
  const urlFileExt = path.parse(originalUrl).ext;
  url.protocol = 'https';
  url.pathname = 'devices';
  url.searchParams.append('file', urlFileName);
  url.searchParams.append('type', urlFileExt);
  return url.href;
}

async function buildOutputObject(files) {
  if (!files.length) {
    throw 'No files has been provided!';
  }
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const object = await getObjectFromFile(file);
    object.url = rebuildUrl(object.url);

    const name = path.basename(file.toLowerCase(), '.json.gz');
    result[name] = object;
  }
  return result;
}

async function saveOutput(object) {
  const jsonOutput = JSON.stringify(object);
  const buffer = Buffer.from(jsonOutput);
  let compressFile;

  try {
    compressFile = await gzip(buffer);
  } catch (error) {
    throw 'Problem with compression json file';
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const archive = await fsp.writeFile(outputFile, compressFile);
    console.log('Archive has created');
  } catch (error) {
    throw 'Can\'t save archive';
  }
}

async function start() {
  try {
    const inputFiles = await getInputFileList();
    const outputObject = await buildOutputObject(inputFiles);
    await saveOutput(outputObject);

  } catch (error) {
    console.error(error);
  }
}

start().catch((err) => console.error('🐞  🤪  🐛\n', err));
