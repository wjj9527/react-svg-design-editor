import TYPES from '@/store/types';
import createUUID from '@/utils/UUID';

const signPipeLineDot = (
  nodes: any,
  baseX: number,
  baseY: number,
  maskArray: [],
  dispatch: any,
) => {
  let dot = [...maskArray];
  //获取所有管道
  const allPipeLineNodes = nodes.filter(
    (item: any) => item.type === 'PipeLine',
  );
  let x = null;
  let y = null;
  for (let item of allPipeLineNodes) {
    const { path, stokeWidth, id } = item;
    let startId = null;
    for (let i = 0; i < path.length - 1; i++) {
      const [x1, y1] = [path[i].x, path[i].y];
      const [x2, y2] = [path[i + 1].x, path[i + 1].y];
      //有斜度
      if (x1 !== x2 && y1 !== y2) {
        const k = ((y2 - y1) / (x2 - x1)) * (baseX - x1) + y1;
        if (k > baseY - stokeWidth / 2 && k < baseY + stokeWidth / 2) {
          y = k;
          x = baseX;
        } else {
          const k = ((x2 - x1) / (y2 - y1)) * (baseY - y1) + x1;
          if (k > baseX - stokeWidth / 2 && k < baseX + stokeWidth / 2) {
            x = k;
            y = baseY;
          }
        }
      }
      //纵轴无斜度
      if (x1 === x2 && y1 !== y2) {
        // @ts-ignore
        if (
          ((baseY > y1 && baseY < y2) || (baseY < y1 && baseY > y2)) &&
          baseX > x1 - stokeWidth / 2 &&
          baseX < x1 + stokeWidth / 2
        ) {
          x = x1;
          y = baseY;
        }
      }
      //横轴无斜度
      if (x1 !== x2 && y1 === y2) {
        if (
          ((baseX > x1 && baseX < x2) || (baseX < x1 && baseX > x2)) &&
          baseY < y1 + stokeWidth / 2 &&
          baseY > y1 - stokeWidth / 2
        ) {
          // @ts-ignore
          x = baseX;
          y = y1;
        }
      }
      if (x !== null && y !== null) {
        startId = path[i].dotId;
        break;
      }
    }
    if (startId) {
      const node = { type: 'L', x, y, dotId: createUUID(), groupId: id };
      // 此处在schema中插入当前点
      if (dispatch) {
        dispatch({
          type: TYPES.INSERT_NEW_NODE_TO_PIPE_LINE_GROUP,
          value: { id, startId, node },
        });
      }
      // @ts-ignore
      dot.push(node);
      break;
    }
  }
  return dot;
};

export default signPipeLineDot;
