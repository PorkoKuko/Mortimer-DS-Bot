// data/bounties.js
import Bounty from '../models/Bounty.js';

const bounties = [];

export const addBounty = (bounty) => {
    bounties.push(bounty);
    bounties.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
};

export const getBounties = () => {
    return bounties.filter(bounty => bounty.isAvailable);
};

export const removeBounty = (name, value) => {
    const index = bounties.findIndex(bounty => bounty.name === name && bounty.value === value);
    if (index !== -1) {
        bounties.splice(index, 1);
    }
};

export default bounties;