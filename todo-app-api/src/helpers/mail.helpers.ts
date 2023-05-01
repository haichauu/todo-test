import * as fs from 'fs';
import * as path from 'path';

const STATIC_DIR = 'src/statics';

export function loadStatic(fileName: string) {
  const projectDir = path.resolve(process.cwd());
  const filePath = path.join(projectDir, `${STATIC_DIR}/${fileName}`);
  return fs.readFileSync(filePath, 'utf8');
}

export function formatTemplate(
  template: string,
  data: Record<string, string>,
): string {
  return template.replace(/{{ (\w*) }}/g, function (m, key) {
    return data[key] || '';
  });
}

export function forgotPasswordTemplate(link: string) {
  const documentForm = loadStatic('templates/forgot-password.html');
  return formatTemplate(documentForm, { link });
}

export function verifyEmailTemplate(link: string) {
  const documentForm = loadStatic('templates/verify-email.html');
  return formatTemplate(documentForm, { link });
}
