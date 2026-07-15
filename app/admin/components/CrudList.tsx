'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Modal from './Modal';

interface CrudListProps<T extends { id: string; order: number }> {
  title: string;
  items: T[];
  apiPath: string;
  renderForm: (item: Partial<T> | null, onChange: (item: Partial<T>) => void) => React.ReactNode;
  emptyItem: Partial<T>;
  onRefresh: () => void;
}

export default function CrudList<T extends { id: string; order: number }>({
  title,
  items,
  apiPath,
  renderForm,
  emptyItem,
  onRefresh,
}: CrudListProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<T> | null>(null);
  const [formData, setFormData] = useState<Partial<T>>(emptyItem);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);

  const openAdd = () => {
    setEditingItem(null);
    setFormData(emptyItem);
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    setFormData(item);
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(emptyItem);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { ...formData, id: editingItem.id } : formData;
      const res = await fetch(apiPath, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Failed to save. Please check your input.');
      } else {
        closeModal();
        onRefresh();
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setWorkingId(id);
    try {
      const res = await fetch(`${apiPath}?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Failed to delete.');
      } else {
        onRefresh();
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setWorkingId(null);
    }
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    setWorkingId(id);
    try {
      const currentOrder = items[index].order;
      const targetOrder = items[targetIndex].order;
      const targetId = items[targetIndex].id;

      const [res1, res2] = await Promise.all([
        fetch(apiPath, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, order: targetOrder }),
        }),
        fetch(apiPath, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetId, order: currentOrder }),
        }),
      ]);

      if (!res1.ok || !res2.ok) {
        const data = await (res1.ok ? res2 : res1).json().catch(() => ({}));
        alert(data.error || 'Failed to reorder.');
      } else {
        onRefresh();
      }
    } catch {
      alert('Network error while reordering. Please try again.');
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-brand-dark">{title}</h2>
        <button
          onClick={openAdd}
          disabled={workingId !== null}
          className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-full font-semibold hover:bg-brand-orange transition-colors disabled:opacity-50"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      <div className="bg-white border border-[#e5e2da] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f3f2ee]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#5e5e5e]">Order</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#5e5e5e]">Title</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#5e5e5e]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2da]">
              {items.map((item: any, idx) => (
                <tr key={item.id} className="hover:bg-[#f3f2ee]/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveItem(item.id, 'up')}
                        disabled={idx === 0 || workingId === item.id}
                        className="p-1 hover:bg-[#e5e2da] rounded disabled:opacity-30"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <span className="font-mono text-sm text-[#5e5e5e] w-6 text-center">{item.order}</span>
                      <button
                        onClick={() => moveItem(item.id, 'down')}
                        disabled={idx === items.length - 1 || workingId === item.id}
                        className="p-1 hover:bg-[#e5e2da] rounded disabled:opacity-30"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-display font-bold text-brand-dark">{item.title || item.name}</div>
                    {item.category && <div className="text-xs text-[#8c8c8c]">{item.category}</div>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        disabled={workingId === item.id}
                        className="p-2 hover:bg-[#f3f2ee] rounded-lg text-[#5e5e5e] hover:text-brand-dark transition-colors disabled:opacity-50"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={workingId === item.id}
                        className="p-2 hover:bg-red-50 rounded-lg text-[#5e5e5e] hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? 'Edit' : 'Add New'}>
        <div className="space-y-4">
          {renderForm(formData, setFormData)}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-4">
            <button
              onClick={closeModal}
              className="flex-1 px-4 py-3 border border-[#e5e2da] rounded-xl font-semibold text-brand-dark hover:bg-[#f3f2ee] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-brand-dark text-white rounded-xl font-semibold hover:bg-brand-orange transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
