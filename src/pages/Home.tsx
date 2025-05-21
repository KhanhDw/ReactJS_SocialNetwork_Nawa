import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-gray-800 text-red-500">Home view</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default Home;