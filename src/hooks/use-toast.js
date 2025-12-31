import * as React from "react";

var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1000000;

var actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

var count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

var toastTimeouts = new Map();

var addToRemoveQueue = function(toastId) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  var timeout = setTimeout(function() {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export var reducer = function(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast].concat(state.toasts).slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(function(t) {
          return t.id === action.toast.id ? { ...t, ...action.toast } : t;
        }),
      };

    case "DISMISS_TOAST": {
      var toastId = action.toastId;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach(function(toast) {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map(function(t) {
          if (t.id === toastId || toastId === undefined) {
            return { ...t, open: false };
          }
          return t;
        }),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter(function(t) {
          return t.id !== action.toastId;
        }),
      };
    default:
      return state;
  }
};

var listeners = [];

var memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach(function(listener) {
    listener(memoryState);
  });
}

function toast(props) {
  var id = genId();

  var update = function(updateProps) {
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...updateProps, id: id },
    });
  };

  var dismiss = function() {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
  };

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id: id,
      open: true,
      onOpenChange: function(open) {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss: dismiss,
    update: update,
  };
}

function useToast() {
  var stateResult = React.useState(memoryState);
  var state = stateResult[0];
  var setState = stateResult[1];

  React.useEffect(function() {
    listeners.push(setState);
    return function() {
      var index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast: toast,
    dismiss: function(toastId) {
      dispatch({ type: "DISMISS_TOAST", toastId: toastId });
    },
  };
}

export { useToast, toast };
