// DO NOT EDIT: generated file by scala-tsi

export interface ICreateNote {
  id?: NodeId
  title: string
  content?: string
  parentId?: NodeId
  after?: NodeId
}

export interface ICreateTab {
  title: string
  after?: TabId
}

export interface INote {
  id: NodeId
  tabId: TabId
  parentId?: NodeId
  title: string
  content?: string
  weight: Weight
}

export interface ITab {
  id: TabId
  title: string
  weight: Weight
}

export interface ITreeNode {
  id: NodeId
  parentId?: NodeId
  title: string
  level: number
  weight: Weight
  children: ITreeNode[]
}

export interface IUpdateNote {
  title?: string
  content?: string
  isRoot?: boolean
  parentId?: NodeId
  first?: boolean
  after?: NodeId
}

export interface IUpdateTab {
  title?: string
  first?: boolean
  after?: TabId
}

export type NodeId = string

export type TabId = string

export type Weight = number
