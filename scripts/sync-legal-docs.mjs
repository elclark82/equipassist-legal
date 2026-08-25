import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = resolve(repositoryRoot, '..', 'EquipAssist-local', 'docs');

const documents = [
  {
    source: 'PRIVACY_POLICY.md',
    output: 'privacy.md',
    title: 'Privacy Policy',
    description: 'How EquipAssist handles personal information.',
    permalink: '/privacy.html',
  },
  {
    source: 'TERMS_OF_SERVICE.md',
    output: 'terms.md',
    title: 'Terms of Service',
    description: 'Terms governing use of the EquipAssist service.',
    permalink: '/terms.html',
  },
  {
    source: 'DATA_DELETION_POLICY.md',
    output: 'data-deletion.md',
    title: 'Data Deletion Policy',
    description: 'How EquipAssist account deletion and data exports work.',
    permalink: '/data-deletion.html',
  },
  {
    source: 'BORROWING_TERMS.md',
    output: 'borrowing-terms.md',
    title: 'Borrowing Terms',
    description: 'Responsibilities for peer-to-peer equipment borrowing.',
    permalink: '/borrowing-terms.html',
  },
];

for (const document of documents) {
  const source = await readFile(resolve(sourceRoot, document.source), 'utf8');
  const frontMatter = [
    '---',
    'layout: default',
    `title: ${document.title}`,
    `description: ${document.description}`,
    `permalink: ${document.permalink}`,
    '---',
    '',
  ].join('\n');

  await writeFile(
    resolve(repositoryRoot, document.output),
    `${frontMatter}${source.trim()}\n`,
  );
}

await mkdir(resolve(repositoryRoot, 'source'), { recursive: true });
for (const document of documents) {
  await copyFile(
    resolve(sourceRoot, document.source),
    resolve(repositoryRoot, 'source', document.source),
  );
}

console.log(`Synced ${documents.length} legal documents from ${sourceRoot}`);
