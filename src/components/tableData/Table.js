import React, { Component } from "react";
//antd
import { Table, Row, Col, Button, Pagination } from "antd";
import PropTypes from "prop-types";
import { prototype } from "case-sensitive-paths-webpack-plugin";

class TableBasic extends Component {
    render() {
        const { columns, dataSource, total, changePageCurrent, changePageSize, batchButton, handlerDelete, rowSelection, rowkey } = this.props;
        return (
            <>
                <Table
                    pagination={false}
                    rowKey={rowkey}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    bordered />
                <div className="spacing-30"></div>
                <Row>
                    <Col span={8}>
                        {/* 函数判断 */}
                        {batchButton && <Button onClick={handlerDelete}>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            className="pull-right"
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

// 校验数据类型 对进来的数据进行校验
TableBasic.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    total: PropTypes.number,
    changePageCurrent: PropTypes.func,
    changePageSize: PropTypes.func,
    batchButton: PropTypes.bool,
    rowSelection: PropTypes.object,
    rowkey: PropTypes.string
}
//默认值
TableBasic.defaultProps = {
    column: [],
    dataSource: [],
    total: 0,
    batchButton: true,
    rowkey: "id"
}

export default TableBasic;
//点击全部选中,key的问题,属性大写，内容随意