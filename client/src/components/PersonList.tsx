import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { FC, memo } from "react";
import { PersonInterface } from "../services/person";
import Person from "./Person";

type Props = {
  persons: PersonInterface[];
  firePerson: (id: string) => void;
};

const variants = {
  hidden: {
    opacity: 0,
    x: -500
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.25
    }
  },
  exit: {
    x: 500,
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
};

const PersonList: FC<Props> = ({ persons, firePerson }) => {
  if (persons.length === 0) {
    return null;
  }

  return (
    <div>
      <AnimateSharedLayout>
        <motion.div
          layout
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {persons.map((person) => {
              return (
                <motion.div
                  key={person.id}
                  layout
                  variants={variants}
                  exit="exit"
                  drag="x"
                  dragElastic
                  dragMomentum
                  dragConstraints={{
                    right: 0,
                    left: 0
                  }}
                  onDragEnd={(p1, p2) => {
                    if (
                      (!person.isBeingFired && p2.offset.x > 500) ||
                      p2.velocity.x > 200
                    ) {
                      firePerson(person.id);
                    }
                  }}
                >
                  <Person
                    firePerson={firePerson}
                    key={person.id}
                    person={person}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
};

export default memo(PersonList);
