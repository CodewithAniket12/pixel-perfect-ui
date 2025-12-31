import * as React from "react";

var MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  var isMobileState = React.useState(undefined);
  var isMobile = isMobileState[0];
  var setIsMobile = isMobileState[1];

  React.useEffect(function() {
    var mql = window.matchMedia("(max-width: " + (MOBILE_BREAKPOINT - 1) + "px)");
    var onChange = function() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return function() {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
}
