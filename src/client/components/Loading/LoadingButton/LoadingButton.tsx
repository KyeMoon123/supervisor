import { Button } from "@/client/primatives/button";
import * as React from "react";
import { Spinner } from "@/client/primatives/spinner";

interface LoadingButtonProps {
  label: string;
  loadingStatus: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | undefined;
  className?: string;
  onClick?: () => void;
}

const LoadingButton = ({
  label,
  loadingStatus,
  type,
  className,
  onClick,
  variant,
}: LoadingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={className}
      variant={variant}
      disabled={loadingStatus}
      type={type}
    >
      {loadingStatus ? (
        <>
          <div className={"flex justify-center items-center w-14"}>
            <Spinner />
          </div>
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default LoadingButton;
