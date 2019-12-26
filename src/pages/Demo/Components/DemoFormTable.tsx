import ArrayWrap from '@/base/components/FormTable/components/ArrayWrap';
import FileWrap from '@/base/components/FormTable/components/FileWrap';
import StringWrap from '@/base/components/FormTable/components/StringWrap';
import FormTable from '@/base/components/FormTable/FormTable';
import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import FormTableTypeEnum from '@/base/components/FormTable/FormTableTypeEnum';
import { UploadType } from '@/base/components/FormTable/LimitUpload';
import IPageProps from '@/base/interfaces/IPageProps';
import { Button } from 'antd';
import Axios from 'axios';
import React, { Component, ReactNode } from 'react';
import DataSource, { IDemoData } from './DemoFormTableData';

let dataSource = DataSource;

interface IDemoFormTableSate {}

class DemoFormTable extends Component<IPageProps, IDemoFormTableSate> {
  public render(): ReactNode {
    return (
      <FormTable<IDemoData>
        showLook
        hidePage={true}
        editColumnRender={(text, record, index, defaultRender) => {
          return (
            <>
              <Button>额外的操作</Button>
              {defaultRender(record)}
              <Button>额外的操作2</Button>
            </>
          );
        }}
        itemList={[
          {
            field: 'id',
            isKey: true,
            formProps: {
              hideInForm: true,
            },
          },
          {
            field: 'name',
            label: '姓名',
            displayInTable: true,
            formProps: {
              required: true,
              disableEdit: true,
            },
          },
          {
            field: 'enable',
            label: '启用',
            type: FormTableTypeEnum.Boolean,
            displayInTable: true,
            render: (text, record) => {
              return record.enable ? '是' : <span style={{ color: '#ff0000' }}>否</span>;
            },
          },
          {
            field: 'age',
            label: '年龄',
            type: FormTableTypeEnum.Number,
            displayInTable: true,
          },
          {
            field: 'sex',
            label: '性别',
            type: FormTableTypeEnum.Array,
            displayInTable: true,
            render: (text: any, record: IDemoData, index: number) => {
              return record.sex === 1 ? '男' : '女';
            },
            formProps: {
              componentWrap: new ArrayWrap(
                [
                  {
                    value: 1,
                    label: '男',
                  },
                  {
                    value: 2,
                    label: '女',
                  },
                ],
                FormTableControlEnum.Radio,
              ),
            },
          },
          {
            field: 'photo',
            label: '头像',
            formProps: {
              componentWrap: new StringWrap(FormTableControlEnum.Image),
            },
          },
          {
            field: 'photoFile',
            label: '头像编辑',
            type: FormTableTypeEnum.File,
            formProps: {
              componentWrap: new FileWrap(UploadType.IMAGE, 1),
            },
          },
          {
            field: 'createTime',
            label: '创建时间',
            type: FormTableTypeEnum.Date,
            formProps: {
              span: 24,
              labelSpan: 3,
            },
          },
          {
            field: 'skills',
            label: '技能',
            type: FormTableTypeEnum.Array,
            formProps: {
              disableEdit: true,
              componentWrap: new ArrayWrap(['杀人', '放火', '装逼'], FormTableControlEnum.Checkbox),
            },
          },
          {
            field: 'work',
            label: '职业',
            type: FormTableTypeEnum.Array,
            formProps: {
              componentWrap: new ArrayWrap(['杀人', '放火', '装逼']),
            },
          },
          {
            field: 'diedTime',
            label: '预计死亡时间',
            type: FormTableTypeEnum.DateArray,
          },
          {
            field: 'remark',
            label: '备注',
          },
          {
            field: 'att',
            label: '附件',
            type: FormTableTypeEnum.File,
            formProps: {
              componentWrap: new FileWrap(UploadType.FILE, 3),
            },
          },
        ]}
        getListFunction={async (currentPage: number) => {
          await Axios.get('.');
          return {
            dataSource,
            total: dataSource.length,
          };
        }}
        deleteFunction={record => {
          dataSource = dataSource.filter(item => item.id !== record.id);
          return Axios.delete('.');
        }}
        getFunction={() => {
          return Axios.get('.');
        }}
        updateFunction={() => {
          return Axios.put('.');
        }}
      />
    );
  }
}

export default DemoFormTable;
