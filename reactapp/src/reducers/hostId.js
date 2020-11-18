export default function HostId (hostId= "", action){
  if(action.type === 'addId'){
    return action.hostId
} else {
    return hostId
}
}