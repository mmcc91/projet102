import { useState , useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  // par défaut, le type est null.rien n'est selectionne 
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [typeList, setTypeList] = useState([]);

  // ajout filteredEvents et typeList, avec useState([]). 
  // Ces états sont utilisés pour stocker respectivement 
  // la liste des événements filtrés et la liste des types d'événements.



  const filterEvents = () => {
    let eventsToDisplay = data?.events || [];
    if (type) {
      eventsToDisplay = eventsToDisplay.filter((event) => event.type === type);
    }
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    const paginatedEvents = eventsToDisplay.slice(startIndex, endIndex);
    setFilteredEvents(paginatedEvents);
  };


    useEffect(() => {
    if (data && data.events) {
      setTypeList(Array.from(new Set(data?.events.map((event) => event.type))));
      filterEvents();
    }
  }, [data, type, currentPage]);

  // ajout de useEffect pour mettre à jour les événements filtrés , 
  // se declanche à chaque fois que data, type ou currentPage change ,
  //  met à jour la liste des types d'événements et filtre les événements à afficher.

  const changeType = (value) => {
    setCurrentPage(1);
    setType(value);
    filterEvents(); // Appel à filterEvents après la mise à jour de type
  };

  const pageNumber = Math.ceil( (filteredEvents?.length || 0) / PER_PAGE) ;

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
