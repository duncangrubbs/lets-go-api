/*
  Sample Event No Owner
  Sample Event Valid Owner
  Event Nearby One
  Event Nearby Two
  Event Far
*/

import Event from '../../db/models/Event';

const eventToSave = {
  title: 'Test event',
  location: {
    latitude: '-10.344',
    longitude: '20.45637',
  },
  description: 'Just a quick sesh',
  owner: 'ashfasif783hfkjsdgn',
  date: 1563398240051,
};

const sampleEventNoOwner = new Event({
  title: 'Test event',
  location: {
    latitude: '-10.344',
    longitude: '20.45637',
  },
  description: 'Just a quick sesh',
  owner: 'ashfasif783hfkjsdgn',
  date: 1563398240051,
});

const sampleEventNoOwnerID = sampleEventNoOwner._id;

function sampleEventValidOwner(owner) {
  return new Event({
    title: 'Test event',
    location: {
      latitude: '-10.344',
      longitude: '20.45637',
    },
    description: 'Just a quick sesh',
    owner,
    date: 1563398240051,
  });
}

const sampleEventNearbyOne = Event({
  title: 'Sample Event Nearby One',
  location: {
    latitude: '-10.344',
    longitude: '20.45637',
  },
  description: 'Just a quick sesh',
  owner: 'ashfasif783hfkjsdgn',
  date: Date.now(),
});

const sampleEventNearbyTwo = Event({
  title: 'Sample Event Nearby Two',
  location: {
    latitude: '-10.344',
    longitude: '20.45637',
  },
  description: 'Just a quick sesh',
  owner: 'ashfasif783hfkjsdgn',
  date: Date.now(),
});

const sampleEventFar = Event({
  title: 'Sample Event Nearby Two',
  location: {
    latitude: '-10.344',
    longitude: '20.45637',
  },
  description: 'Just a quick sesh',
  owner: 'ashfasif783hfkjsdgn',
  date: Date.now(),
});

const sampleEventNearbyOneID = sampleEventNearbyOne._id;
const sampleEventNearbyTwoID = sampleEventNearbyTwo._id;
const sampleEventFarID = sampleEventFar._id;

export {
  eventToSave,
  sampleEventNoOwner,
  sampleEventNoOwnerID,
  sampleEventValidOwner,
  sampleEventNearbyOne,
  sampleEventNearbyTwo,
  sampleEventNearbyOneID,
  sampleEventNearbyTwoID,
  sampleEventFar,
  sampleEventFarID,
};
