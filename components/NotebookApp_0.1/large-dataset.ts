import { MyData } from "./backend";

export function makeLargeData(): MyData {
  const root: MyData = { id: "ROOT", title: "ROOT", isOpen: true, children: [], level: 0 };

  for (let i = 0; i < 1000; i++) {
    const node: MyData = {
      id: i.toString(),
      title: i.toString(),
      isOpen: true,
      children: [],
      level: i
    };
    for (let j = 0; j < 10; j++) {
      node.children!.push({
        id: i.toString() + "." + j.toString(),
        title: i.toString() + "." + j.toString(),
        isOpen: true,
        level: j
      } as MyData);
    }
    root.children!.push(node);
  }

  return root;
}
