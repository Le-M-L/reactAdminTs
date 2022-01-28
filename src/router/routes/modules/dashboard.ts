import type { AppRouteModule } from "@/router/types";
import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
    path: '/dashboard',
    name: 'Dashboard',
    element: LAYOUT,
    // redirect: '/dashboard/analysis',
    meta: {
      title: 'test',
    },
}

export default dashboard