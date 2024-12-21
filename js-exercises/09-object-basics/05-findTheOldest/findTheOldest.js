const findTheOldest = function(people) {
  let oldest = 0;
  let oldestPerson;
  const currentYear = new Date().getFullYear();

  people.forEach( (person) => {
    const personAge = (person.yearOfDeath || currentYear) - person.yearOfBirth;

    if (personAge > oldest) {
      oldest = personAge;
      oldestPerson = person;
    }
  });

  return oldestPerson;
};

// Do not edit below this line
module.exports = findTheOldest;
