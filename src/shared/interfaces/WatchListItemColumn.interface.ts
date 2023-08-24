import IWatchListItem from "./watchListItem.interface";

interface IWatchListItemColumn extends IWatchListItem {
    key: string,
    dataIndex: string
}

export default IWatchListItemColumn