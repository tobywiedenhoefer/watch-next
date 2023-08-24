import { DocumentData, getDoc, QueryDocumentSnapshot, DocumentReference } from "firebase/firestore";
import IWatchListItemColumn from "../interfaces/WatchListItemColumn.interface";


class WatchListItem {
    doc: QueryDocumentSnapshot<DocumentData, DocumentData>;
    addedByUserId: string
    addedByUsername?: string
    genre: string
    title: string
    id: string
    constructor(d: QueryDocumentSnapshot<DocumentData, DocumentData>) {
        this.doc = d
        const data = this.doc.data()
        this.addedByUserId = data.addedByUserId
        this.genre = data.genre
        this.title = data.title
        this.id = this.doc.id
    }

    async populateAddedByUsername() {
        const data = this.doc.data()
        if (data.usernameRef) {
            const usernameRef: DocumentReference = data.usernameRef!;
            const usernameSnap = await getDoc(usernameRef);
            const usernameData = usernameSnap.data()
            const username: string = usernameData ? usernameData.name : ""
            this.addedByUsername = username
        } else {
            this.addedByUsername = ""
        }
    }

    column(): IWatchListItemColumn {
        return {
            genre: this.genre,
            title: this.title,
            addedByUsername: this.addedByUsername!,
            addedByUserId: this.addedByUserId,
            dataIndex: this.title,
            key: this.id,
            id: this.id
        }
    }
}

export default WatchListItem