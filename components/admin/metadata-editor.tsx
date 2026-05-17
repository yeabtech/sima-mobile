"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { ProductMetadata } from "@/lib/types";

type Field = { id: string; key: string; value: string };

function metadataToFields(metadata: ProductMetadata): Field[] {
  return Object.entries(metadata).map(([key, value]) => ({
    id: crypto.randomUUID(),
    key,
    value: String(value),
  }));
}

function fieldsToMetadata(fields: Field[]): ProductMetadata {
  const result: ProductMetadata = {};
  for (const field of fields) {
    const k = field.key.trim();
    if (!k) continue;
    const v = field.value.trim();
    if (v === "true") result[k] = true;
    else if (v === "false") result[k] = false;
    else if (v !== "" && !Number.isNaN(Number(v)) && /^-?\d+(\.\d+)?$/.test(v)) {
      result[k] = Number(v);
    } else result[k] = v;
  }
  return result;
}

type MetadataEditorProps = {
  name?: string;
  initialMetadata?: ProductMetadata;
};

export function MetadataEditor({
  name = "metadata",
  initialMetadata = {},
}: MetadataEditorProps) {
  const hiddenId = useId();
  const [fields, setFields] = useState<Field[]>(() =>
    metadataToFields(initialMetadata),
  );
  const [json, setJson] = useState(() =>
    JSON.stringify(fieldsToMetadata(metadataToFields(initialMetadata))),
  );

  useEffect(() => {
    setJson(JSON.stringify(fieldsToMetadata(fields)));
  }, [fields]);

  function addField() {
    setFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), key: "", value: "" },
    ]);
  }

  function removeField(id: string) {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }

  function updateField(id: string, patch: Partial<Pick<Field, "key" | "value">>) {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    );
  }

  return (
  <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-white">
            Specifications (dynamic)
          </h3>
          <p className="text-sm text-zinc-500">
            Add any key/value pairs — RAM, wattage, model number, etc.
          </p>
        </div>
        <button
          type="button"
          onClick={addField}
          className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          <Plus className="h-4 w-4" />
          Add field
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
          No specs yet. Click &quot;Add field&quot; to define product attributes.
        </p>
      ) : (
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex gap-2">
              <input
                placeholder="Field name (e.g. Battery)"
                value={field.key}
                onChange={(e) => updateField(field.id, { key: e.target.value })}
                className="input-field flex-1"
              />
              <input
                placeholder="Value (e.g. 5000mAh)"
                value={field.value}
                onChange={(e) =>
                  updateField(field.id, { value: e.target.value })
                }
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="rounded-xl border border-zinc-200 p-2 text-red-600 hover:bg-red-50 dark:border-zinc-700 dark:hover:bg-red-950/30"
                aria-label="Remove field"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <input type="hidden" id={hiddenId} name={name} value={json} readOnly />
    </div>
  );
}
