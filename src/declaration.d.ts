
declare module "*.scss" {
  const content: {[className: string]: string};
  export default content;
}

declare module "redux-persist-transform-immutable" {
  export default function immutableTransform(): any;
}

declare module "redux-persist/es/integration/react" {

  interface IPersistGateProps {
    loading: any;
    persistor: any;
  }

  export class PersistGate extends React.Component<IPersistGateProps, any> {}
}
