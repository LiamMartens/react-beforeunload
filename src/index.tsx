import React from 'react';
import { matchPath, useHistory } from 'react-router';

export interface IBeforeLeaveOptions {
  message: string;
  enableUnload?: boolean;
  enableRouter?: boolean;
  path?: string;
  exact?: boolean;
}

export const useBeforeleave = (
  {
    message,
    exact = true,
    path = '',
    enableUnload = true,
    enableRouter = true,
  }: IBeforeLeaveOptions,
) => {
  if (enableUnload) {
    React.useEffect(() => {
      const onBeforeUnload = (event: BeforeUnloadEvent) => {
        event.returnValue = message;
        return message;
      };
      window.addEventListener('beforeunload', onBeforeUnload);
      return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, []);
  }

  if (enableRouter) {
    const history = useHistory();
    React.useEffect(() => {
      const unbind = history.listen(listener => {
        if (matchPath(listener.pathname, { exact, path: !!path ? path : location.pathname }))
          history.block(message);
      });
      return () => unbind();
    }, []);
  }
}

export const BeforeLeave: React.FunctionComponent<IBeforeLeaveOptions> = (props) => {
  useBeforeleave(props);
  return null;
};