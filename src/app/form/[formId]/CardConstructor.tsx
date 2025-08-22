"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { Card, FormFieldType } from '@hzzhsoftware/types-form'
import FieldConstructor from '../../../components/form/fields/FieldConstructor'
import { useFormBuilderContext } from '../components/FormBuilderContext';
import { v4 as uuidv4 } from 'uuid';
import FieldTypeSelector from './FieldTypeSelector';
import type { PointerSensorOptions } from '@dnd-kit/core';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// prevent drag from starting when clicking on inputs, buttons, etc
function isInteractive(el: HTMLElement | null): boolean {
  if (!el) return false;
  const interactive = 'input,textarea,select,button,[contenteditable="true"],label,a,svg';
  return !!el.closest(interactive);
}
class SafePointerSensor extends PointerSensor {
  static activators: Array<{
    eventName: 'onPointerDown';
    handler: (
      event: React.PointerEvent<Element>,
      options: PointerSensorOptions
    ) => boolean;
  }> = [
    {
      eventName: 'onPointerDown' as const,
      handler: (event, { onActivation }) => {
        const target = event.nativeEvent.target as HTMLElement | null;
        if (isInteractive(target)) return false;
        // let dnd-kit run its normal activation flow
        onActivation?.({ event: event as unknown as Event });
        return true;
      },
    },
  ];
}

interface CardConstructorProps {
  card: Card;
}

function SortableField({
  id,
  isActive,
  onClick,
  children,
}: {
  id: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div
        {...attributes}
        {...listeners}
        className={`border-2 rounded-lg p-4 transition-all duration-200 ${
          isActive
            ? 'border-primary-500 bg-neutral-200'
            : 'border-dashed border-neutral-200 hover:border-primary-300 hover:bg-neutral-50 cursor-grab active:cursor-grabbing'
        }`}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}

const CardConstructor: React.FC<CardConstructorProps> = ({ card }) => {
  const { currentCardId, currentFieldId, setCurrentFieldId, updateLocalForm } = useFormBuilderContext();
  const [title, setTitle] = useState(card.title || "Your question here.");
  const [description, setDescription] = useState((card as any).description || "Description (optional)");

  useEffect(() => {
    setTitle(card.title || "Your question here.");
    setDescription((card as any).description || "Description (optional)");
  }, [card]);

  const sensors = useSensors(
    useSensor(SafePointerSensor, { activationConstraint: { distance: 2 } }),
    useSensor(KeyboardSensor)
  );

  const fieldIds = useMemo(() => card.fields.map(f => f.id), [card.fields]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.id === currentCardId ? { ...c, title: newTitle } : c)
    }));
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.id === currentCardId ? { ...c, description: newDescription } : c)
    }));
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.id === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.id === fieldId ? { ...field, value } : field)
      } : c)
    }));
  };

  const handleFieldOptionsChange = (fieldId: string, options: string[]) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.id === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.id === fieldId ? { ...field, options } : field)
      } : c)
    }));
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<any>) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.id === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.id === fieldId ? { ...field, ...updates } : field)
      } : c)
    }));
  };

  const handleFieldLabelChange = (fieldId: string, newLabel: string) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.id === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.id === fieldId ? { ...field, label: newLabel } : field)
      } : c)
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c =>
        c.id === currentCardId
          ? { ...c, fields: c.fields.filter(field => field.id !== fieldId) }
          : c
      )
    }));
  };

  const handleAddField = (fieldType: FormFieldType) => {
    const createField = (type: FormFieldType) => {
      const baseField = {
        id: uuidv4(),
        type,
        label: `New ${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Field`,
        isRequired: false,
      };

      switch (type) {
        case 'multiple_choice':
        case 'multiple_select':
          return {
            ...baseField,
            options: ['Option 1', 'Option 2', 'Option 3'],
            allowMultiple: false,
            isRandomized: false,
            allowOther: false,
            isVerticalAlignment: false,
          };
        case 'uploader':
          return { ...baseField, allowMultiple: false, uploadService: 'local' as const };
        case 'static':
          return { ...baseField, title: 'Static Content Title', description: 'Optional description text', image: '' };
        default:
          return baseField;
      }
    };

    const newField = createField(fieldType);
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c =>
        c.id === currentCardId ? { ...c, fields: [...c.fields, newField as any] } : c
      )
    }));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const activeId = event.active.id as string;
    const overId = event.over?.id as string | undefined;
    if (!overId || activeId === overId) return;

    const startIndex = card.fields.findIndex(f => f.id === activeId);
    const endIndex = card.fields.findIndex(f => f.id === overId);
    if (startIndex === -1 || endIndex === -1) return;

    const reordered = arrayMove(card.fields, startIndex, endIndex);

    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c =>
        c.id === currentCardId ? { ...c, fields: reordered } : c
      )
    }));

    if (currentFieldId === activeId) setCurrentFieldId(activeId);
  };

  return (
    <div className="w-full space-y-6">
      {/* Card Title */}
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full bg-transparent text-lg font-medium border-none outline-none placeholder-neutral-400 focus:ring-0"
          placeholder="Your question here."
        />
        <input
          type="text"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-full bg-transparent text-sm border-none outline-none placeholder-neutral-500 focus:ring-0"
          placeholder="Description (optional)"
        />
      </div>

      {/* Fields */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-6 relative">
            {card.fields.map((field) => (
              <div key={field.id} className="relative group">
                <SortableField
                  id={field.id}
                  isActive={field.id === currentFieldId}
                  onClick={() => setCurrentFieldId(field.id)}
                >
                  <FieldConstructor
                    field={field}
                    onChange={(val) => handleFieldChange(field.id, val)}
                    onOptionsChange={(options) => handleFieldOptionsChange(field.id, options)}
                    onFieldUpdate={(updates) => handleFieldUpdate(field.id, updates)}
                    onLabelChange={(label) => handleFieldLabelChange(field.id, label)}
                  />
                </SortableField>

                <button
                  onClick={() => handleDeleteField(field.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete field"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {card.fields.length === 0 && (
              <div className="text-center py-8 text-neutral-500 text-sm">
                No fields added yet. Click on a field type to add one.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Field */}
      <FieldTypeSelector onAddField={handleAddField} />
    </div>
  );
}

export default CardConstructor