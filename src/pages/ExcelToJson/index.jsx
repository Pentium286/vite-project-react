import { useMemo, useState } from 'react';
import { InboxOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { Upload, Button, Table, Tabs, message } from 'antd';
import readXlsxFile from 'read-excel-file';

const { Dragger } = Upload;

const ExcelToJson = () => {
  const [jsonData, setJsonData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileName, setFileName] = useState('');

  const parseExcel = async (file) => {
    try {
      const rows = await readXlsxFile(file);
      if (!rows || rows.length === 0) {
        message.warning('文件内容为空');
        return false;
      }

      const headers = rows[0].map((h, i) =>
        h !== null && h !== undefined && String(h).trim() !== ''
          ? String(h)
          : `Column_${i + 1}`
      );
      const dataRows = rows.slice(1).map((row, index) => {
        const obj = { _rowIndex: index };
        headers.forEach((header, i) => {
          obj[header] = row[i] !== null && row[i] !== undefined ? row[i] : '';
        });
        return obj;
      });

      const tableColumns = headers.map((header) => ({
        title: header,
        dataIndex: header,
        key: header,
        ellipsis: true,
      }));

      setColumns(tableColumns);
      setJsonData(dataRows);
      setFileName(file.name);
      message.success(`解析成功，共 ${dataRows.length} 行数据`);
    } catch (err) {
      message.error('文件解析失败，请确认是有效的 Excel 文件');
    }
    return false;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2)).then(() => {
      message.success('JSON 已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败，请手动复制 JSON 数据');
    });
  };

  const handleClear = () => {
    setJsonData([]);
    setColumns([]);
    setFileName('');
  };

  const exportData = useMemo(
    () => jsonData.map(({ _rowIndex, ...rest }) => rest),
    [jsonData]
  );

  const tabItems = [
    {
      key: 'table',
      label: '表格预览',
      children: (
        <Table
          dataSource={jsonData}
          columns={columns}
          rowKey="_rowIndex"
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          size="small"
        />
      ),
    },
    {
      key: 'json',
      label: 'JSON 数据',
      children: (
        <pre
          style={{
            background: '#f5f5f5',
            padding: 16,
            borderRadius: 4,
            maxHeight: 500,
            overflow: 'auto',
            fontSize: 12,
          }}
        >
          {JSON.stringify(exportData, null, 2)}
        </pre>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Excel 转 JSON</h2>
      <Dragger
        accept=".xlsx,.xls"
        beforeUpload={parseExcel}
        showUploadList={false}
        style={{ marginBottom: 24 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽 Excel 文件到此区域上传</p>
        <p className="ant-upload-hint">支持 .xlsx 和 .xls 格式，文件仅在本地解析，不会上传到服务器</p>
      </Dragger>

      {jsonData.length > 0 && (
        <>
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#666' }}>文件：{fileName}</span>
            <Button icon={<CopyOutlined />} onClick={handleCopy}>
              复制 JSON
            </Button>
            <Button icon={<DeleteOutlined />} danger onClick={handleClear}>
              清除
            </Button>
          </div>
          <Tabs items={tabItems} />
        </>
      )}
    </div>
  );
};

export default ExcelToJson;
