/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

import { inputsModel } from '../../../../../common/store';
import { BrowserFields, DocValueFields } from '../../../../../common/containers/source';
import {
  TimelineItem,
  TimelineNonEcsData,
} from '../../../../../../common/search_strategy/timeline';
import { ColumnHeaderOptions } from '../../../../../timelines/store/timeline/model';
import { Note } from '../../../../../common/lib/note';
import { AddNoteToEvent, UpdateNote } from '../../../notes/helpers';
import {
  OnColumnResized,
  OnPinEvent,
  OnRowSelected,
  OnUnPinEvent,
  OnUpdateColumns,
} from '../../events';
import { EventsTbody } from '../../styles';
import { ColumnRenderer } from '../renderers/column_renderer';
import { RowRenderer } from '../renderers/row_renderer';
import { StatefulEvent } from './stateful_event';
import { eventIsPinned } from '../helpers';

interface Props {
  actionsColumnWidth: number;
  addNoteToEvent: AddNoteToEvent;
  browserFields: BrowserFields;
  columnHeaders: ColumnHeaderOptions[];
  columnRenderers: ColumnRenderer[];
  containerElementRef: HTMLDivElement;
  data: TimelineItem[];
  docValueFields: DocValueFields[];
  eventIdToNoteIds: Readonly<Record<string, string[]>>;
  getNotesByIds: (noteIds: string[]) => Note[];
  id: string;
  isEventViewer?: boolean;
  loadingEventIds: Readonly<string[]>;
  onColumnResized: OnColumnResized;
  onPinEvent: OnPinEvent;
  onRowSelected: OnRowSelected;
  onUpdateColumns: OnUpdateColumns;
  onUnPinEvent: OnUnPinEvent;
  pinnedEventIds: Readonly<Record<string, boolean>>;
  refetch: inputsModel.Refetch;
  rowRenderers: RowRenderer[];
  selectedEventIds: Readonly<Record<string, TimelineNonEcsData[]>>;
  showCheckboxes: boolean;
  toggleColumn: (column: ColumnHeaderOptions) => void;
  updateNote: UpdateNote;
}

const EventsComponent: React.FC<Props> = ({
  actionsColumnWidth,
  addNoteToEvent,
  browserFields,
  columnHeaders,
  columnRenderers,
  containerElementRef,
  data,
  docValueFields,
  eventIdToNoteIds,
  getNotesByIds,
  id,
  isEventViewer = false,
  loadingEventIds,
  onColumnResized,
  onPinEvent,
  onRowSelected,
  onUpdateColumns,
  onUnPinEvent,
  pinnedEventIds,
  refetch,
  rowRenderers,
  selectedEventIds,
  showCheckboxes,
  toggleColumn,
  updateNote,
}) => (
  <EventsTbody data-test-subj="events">
    {data.map((event) => (
      <StatefulEvent
        actionsColumnWidth={actionsColumnWidth}
        addNoteToEvent={addNoteToEvent}
        browserFields={browserFields}
        columnHeaders={columnHeaders}
        columnRenderers={columnRenderers}
        containerElementRef={containerElementRef}
        disableSensorVisibility={data != null && data.length < 101}
        docValueFields={docValueFields}
        event={event}
        eventIdToNoteIds={eventIdToNoteIds}
        getNotesByIds={getNotesByIds}
        isEventPinned={eventIsPinned({ eventId: event._id, pinnedEventIds })}
        isEventViewer={isEventViewer}
        key={`${event._id}_${event._index}`}
        loadingEventIds={loadingEventIds}
        onColumnResized={onColumnResized}
        onPinEvent={onPinEvent}
        onRowSelected={onRowSelected}
        onUnPinEvent={onUnPinEvent}
        onUpdateColumns={onUpdateColumns}
        refetch={refetch}
        rowRenderers={rowRenderers}
        selectedEventIds={selectedEventIds}
        showCheckboxes={showCheckboxes}
        timelineId={id}
        toggleColumn={toggleColumn}
        updateNote={updateNote}
      />
    ))}
  </EventsTbody>
);

export const Events = React.memo(EventsComponent);
