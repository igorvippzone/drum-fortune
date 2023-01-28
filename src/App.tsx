import { FC, useEffect, useState } from "react";

import DrumWheel from "./DrumFortune";
import IVariant from "./DrumFortune/interface";

const App: FC = () => {
  const [data, setData] = useState<IVariant[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8080/get-variants")
      .then((res) => res.json())
      .then(setData)
      .catch((e: ErrorEvent) => {
        setError(e.message);
      });
  }, []);

  const getResult = (res: IVariant) => {
    fetch("http://localhost:8080/save-variant", {
      method: "POST",
      body: JSON.stringify(res),
    }).catch(console.log);
  };

  return (
    <div className="App">
      <DrumWheel
        error={error}
        data={data}
        getResult={getResult}
        speedAnimation={60}
        timeSpin={4000}
      />
    </div>
  );
};

export default App;
