//! FIX VALUES TO FIT DEVICE

import { useSafeAreaInsets } from "react-native-safe-area-context";

const useMaterialNavBarHeight = (withoutBottomTabs: boolean) => {
  const { bottom, top } = useSafeAreaInsets();

  return bottom - Math.floor(top) + (withoutBottomTabs ? 0 : 54);
};

export default useMaterialNavBarHeight;
