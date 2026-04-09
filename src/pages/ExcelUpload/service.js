import http from '@/api/http';

export async function uploadExcelFile(file) {
  return http.upload('/api/excel/upload', file, {
    successTip: '上传成功',
    errorTip: '上传失败',
  });
}
