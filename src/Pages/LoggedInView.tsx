import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Table, Button, Tooltip, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import type { ColumnsType } from 'antd/es/table'

import { UserContext } from "../shared/contexts/UserContext";
import WatchListItem from "../shared/models/WatchListItem";
import IWatchListItemColumn from "../shared/interfaces/WatchListItemColumn.interface";
import { db } from "../firebase";


type ColumnFilter = {
    text: string,
    value: string
}


const LoggedInView = () => {
    const user = useContext(UserContext);
    const [search, setSearch] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [watchListItems, setWatchListItems] = useState<WatchListItem[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [genreFilters, setGenreFilters] = useState<ColumnFilter[]>([]);
    const [usernameFilters, setUsernameFilters] = useState<ColumnFilter[]>([]);

    useEffect(() => {
        const getWatchList = async () => {
            const wlQuery = query(collection(db, "watch-list"), where("addedByUserId", "==", user.uid!));
            const wlQuerySnapshot = await getDocs(wlQuery);
            wlQuerySnapshot.forEach(async (doc) => {
                const watchListItem = new WatchListItem(doc);
                await watchListItem.populateAddedByUsername()
                setWatchListItems([...watchListItems, watchListItem])
                setGenreFilters([...genreFilters, {
                    text: watchListItem.genre,
                    value: watchListItem.genre
                }])
                setUsernameFilters([...usernameFilters, {
                    text: watchListItem.addedByUsername!,
                    value: watchListItem.addedByUsername!
                }])
            })
            setSearch(false);
        }
        if (search) {
            getWatchList()
        }
    }, [search])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    const removeRows = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([])
            // setSearch(true)
            setLoading(false)
        }, 1000)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsModalOpen(false);
        }, 3000)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }


    const columns:  ColumnsType<IWatchListItemColumn> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            filters: genreFilters
        },
        {
            title: 'Added By',
            dataIndex: 'addedByUsername',
            key: 'addedByUsername',
            filters: usernameFilters
        }
    ]
    return (
        <div className="table-container">
            <div className="table">
                <Button 
                    type="primary" 
                    onClick={removeRows} 
                    disabled={selectedRowKeys.length === 0}
                    loading={loading}
                    style={{ marginBottom: "0.5rem" }}
                    danger
                >
                    Delete
                </Button>
                <div style={{ float: "right" }}>
                    <Tooltip title="Add Item" style={{ marginLeft: "auto", marginRight: "0" }}>
                        <Button 
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                            loading={loading}
                            type="primary"
                            style={{ marginLeft: "auto", marginRight: "0" }}
                        />
                    </Tooltip>
                </div>
                <Table 
                    columns={columns} 
                    dataSource={watchListItems.map((wli) => { return wli.column() })} 
                    pagination={{ position: ['none', 'none'] }} 
                    rowSelection={rowSelection} 
                />
            </div>
            <Modal 
                title="Add to Watch List" 
                open={isModalOpen} 
                onCancel={handleCancel}
                footer={[null, null]}
            >
                <Form
                    name="addToWatchList"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    preserve={false}
                    autoComplete="off"
                    labelAlign="left"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter a title!'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{required: true, message: 'Please enter a genre!'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button loading={loading} type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default LoggedInView