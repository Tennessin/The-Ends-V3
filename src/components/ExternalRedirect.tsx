import { useEffect } from "react";

/** Sends the visitor to an external URL (used for short links like /discord). */
export const ExternalRedirect = ({ to }: { to: string }): JSX.Element => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#060507] text-[#f7f5f2]">
      <p className="[font-family:'Inter',Helvetica] text-sm text-[#a296b6]">
        Redirecting… <a className="text-[#c3b2df] underline" href={to}>Click here if nothing happens</a>
      </p>
    </main>
  );
};
