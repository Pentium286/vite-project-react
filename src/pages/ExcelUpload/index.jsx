import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Table, Upload } from 'antd';
import { uploadExcelFile } from './service';

const { Dragger } = Upload;

const ACCEPT_TYPES = '.xlsx,.xls';

const ExcelUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const beforeUpload = (file) => {
    const isExcel =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';
    if (!isExcel) {
      message.error('只支持上传 .xlsx 或 .xls 格式的文件！');
      return Upload.LIST_IGNORE;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('文件大小不能超过 10MB！');
      return Upload.LIST_IGNORE;
    }
    setFileList([file]);
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    setResultData(null);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('请先选择要上传的 Excel 文件！');
      return;
    }
    setUploading(true);
    try {
      const res = await uploadExcelFile(fileList[0]);
      setResultData(res);
      setFileList([]);
    } catch {
      // error already handled in service layer
    } finally {
      setUploading(false);
    }
  };

  const resultColumns =
    resultData?.data && Array.isArray(resultData.data) && resultData.data.length > 0
      ? Object.keys(resultData.data[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key,
          ellipsis: true,
        }))
      : [];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 0' }}>
      <Dragger
        name="file"
        accept={ACCEPT_TYPES}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        maxCount={1}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽 Excel 文件到此区域上传</p>
        <p className="ant-upload-hint">支持 .xlsx、.xls 格式，文件大小不超过 10MB</p>
      </Dragger>

      <Button
        type="primary"
        onClick={handleUpload}
        loading={uploading}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        {uploading ? '上传中...' : '开始上传'}
      </Button>

      {resultData?.data && Array.isArray(resultData.data) && resultData.data.length > 0 && (
        <Table
          style={{ marginTop: 24 }}
          columns={resultColumns}
          dataSource={resultData.data.map((row, i) => ({ ...row, key: i }))}
          scroll={{ x: 'max-content' }}
          bordered
          size="small"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default ExcelUpload;
