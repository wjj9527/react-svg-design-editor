export default {
  path: [
    {
      type: 'M',
      x: 0,
      y: 0,
    },
    {
      type: 'L',
      x: 0,
      y: 0,
    },
  ],
  stokeWidth: 20,
  ratio: null,
  type: 'PipeLine',
  label: '管道',
  icon: 'icon-guandao',
  lock: false,
  visible: true,
  data: {
    line: {
      type: 'dashed',
      color: '#3dfd46',
      opacity: 1,
      width: 5,
      dashedLength: 40,
      dashedInterval: 50,
    },
    animation: {
      flow: true,
      flowVelocity: 25,
    },
    pipe: {
      visible: true,
      color: '#3dfd46',
      opacity: 1,
      width: 20,
    },
    background: {
      visible: true,
      color: '#122C45',
      opacity: 1,
      width: 20,
    },
  },
};
