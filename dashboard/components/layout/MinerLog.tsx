import { Code } from "@mantine/core";
import { useEffect, useState } from "react";

interface Props {
  source: string;
}

export const MinerLog = ({ source }: Props) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const logs = await (await fetch(source)).json();

      logs.pop();

      setLogs(logs);
    }, 2000);

    return () => clearInterval(interval);
  });

  let code = "";
  for (const log of logs) {
    code += log + "\n";
  }

  return (
    <Code block color="teal">
      {code}
    </Code>
  );
};
