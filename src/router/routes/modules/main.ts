import type { AppRouteModule } from "@/router/types";
import { LAYOUT } from '@/router/constant';

const main: AppRouteModule = {
    path: '/dashboard',
    name: 'Dashboard',
    element: LAYOUT,
    // redirect: '/dashboard/analysis',
    meta: {
      title: 'test',
    },
}

export default main