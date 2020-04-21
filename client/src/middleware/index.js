import { EventActions } from '@drizzle/store'

var seenEventIds = [];

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    if (!seenEventIds.includes(action.event.id)) {
      seenEventIds.push(action.event.id);
      const contract = action.name;
      const contractEvent = action.event.event;
      console.log(action);
      console.log("test");
      console.log(`${contract}(${contractEvent})`);
    }
  }
  return next(action)
}

export default [contractEventNotifier];