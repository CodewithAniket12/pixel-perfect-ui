import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

var NavLink = forwardRef(function(props, ref) {
  var className = props.className;
  var activeClassName = props.activeClassName;
  var pendingClassName = props.pendingClassName;
  var to = props.to;
  
  // Extract rest of props
  var rest = {};
  Object.keys(props).forEach(function(key) {
    if (key !== 'className' && key !== 'activeClassName' && key !== 'pendingClassName' && key !== 'to') {
      rest[key] = props[key];
    }
  });

  return (
    <RouterNavLink
      ref={ref}
      to={to}
      className={function(state) {
        return cn(className, state.isActive && activeClassName, state.isPending && pendingClassName);
      }}
      {...rest}
    />
  );
});

NavLink.displayName = "NavLink";

export { NavLink };
