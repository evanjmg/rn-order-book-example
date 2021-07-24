export enum SocketActionType {
  connect = 'socket/connect',
  disconnect = 'socket/disconnect',
}
export const connectSocket = () => ({
  type: SocketActionType.connect,
})
