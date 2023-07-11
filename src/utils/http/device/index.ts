import { BASE_URL } from '@/global';
import { http } from '@/utils/http';
const { $get } = http(BASE_URL.DEVICE);
export const deviceParamsList = () =>
  $get('/visual_config/device/param/getDeviceParamList');
