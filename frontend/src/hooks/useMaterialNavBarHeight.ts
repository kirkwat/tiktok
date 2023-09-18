//! FIX VALUES TO FIT DEVICE (CURRENTLY SET FOR PIXEL PRO 7: 24, 104)
// VALUES FOR IPHONE 14 PRO MAX: 25, 139

import { useSafeAreaInsets } from "react-native-safe-area-context";

const useMaterialNavBarHeight = (withoutBottomTabs: boolean) => {
  const { bottom, top } = useSafeAreaInsets();

  return bottom - Math.floor(top) + (withoutBottomTabs ? 24 : 104);
};

export default useMaterialNavBarHeight;
