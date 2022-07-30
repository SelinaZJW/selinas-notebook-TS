import {NodeId} from "../../model";

export function nextNoteId(): NodeId {
    const time = new Date().valueOf();
    const trim = time.toString().substring(-4)

    return `NOTE-${trim}`
}