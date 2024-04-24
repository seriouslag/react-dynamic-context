import { ReactNode, useContext, useState } from "react";
import { ChildContext, ParentContext } from "./Singletons";

export const App = () => {
  return <Parent />;
};

export const Parent = () => {
  const [dynamicChildren, setDynamicChildren] = useState<ReactNode[]>([]);

  // this will be "parent0" because it is the closest parent context provider
  const parent = useContext(ParentContext);

  const onClick = (name: string) => {
    setDynamicChildren((prev) => [
      ...prev,
      <DynamicChild key={name} name={name} />,
    ]);
  };

  return (
    <ParentContext.Provider value="parent1">
      <div>Parent: {parent}</div>
      <ChildContext.Provider value="child0">
        <StaticChild name="Static Child 0" />
      </ChildContext.Provider>
      {dynamicChildren.map((child, index) => {
        return (
          <ChildContext.Provider key={index} value={`child-${index}`}>
            {child}
          </ChildContext.Provider>
        );
      })}
      <button
        onClick={() => onClick("Dynamic Child " + dynamicChildren.length)}
      >
        Add a child
      </button>
    </ParentContext.Provider>
  );
};

export const StaticChild = ({ name }: { name: string }) => {
  const state = useContext(ChildContext);
  // this will be "parent1" because it is the closest parent context provider
  const parent = useContext(ParentContext);
  return (
    <div>
      <div>Child: {name}</div>
      <div>state: {state}</div>
      <div>Parent: {parent}</div>
    </div>
  );
};

export const DynamicChild = ({ name }: { name: string }) => {
  const state = useContext(ChildContext);
  // this will be "parent1" because it is the closest parent context provider
  const parent = useContext(ParentContext);
  return (
    <div>
      <div>Child: {name}</div>
      <div>state: {state}</div>
      <div>Parent: {parent}</div>
    </div>
  );
};
