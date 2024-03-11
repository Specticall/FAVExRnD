import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export function PageLoader({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const { state } = useNavigation();
  const loaderRef = useRef<LoadingBarRef | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    if (state === "loading") loaderRef.current.staticStart(70);
    if (state === "idle") loaderRef.current.complete();
  }, [state]);

  return (
    <>
      <LoadingBar
        ref={loaderRef}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </>
  );
}
