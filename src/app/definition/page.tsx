'use client';

import React, {useEffect, useState} from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import {DefinitionPageProps} from '@/types';
import {FilePenLine, Trash2} from 'lucide-react';
import Dropdown from '@/components/Dropdown';
import {
    createDefinition,
    fetchDefinitions,
    fetchEnumDefinitions,
    fetchParentDefinitions,
    deleteDefinition,
} from '@/services/definitionService';

const Definition = () => {
    const [definitions, setDefinitions] = useState<DefinitionPageProps['definitions']>([]);
    const [parentDefinitions, setParentDefinitions] = useState<{ value: number; label: string }[]>([]);
    const [definitionEnum, setDefinitionEnum] = useState<{ value: number; label: string }[]>([]);
    const [selectedEnum, setSelectedEnum] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [definitionType, setDefinitionType] = useState<number | null>(null);
    const [, setSelectedParentDefinition] = useState<number | null>(null);
    const [newDefinition, setNewDefinition] = useState({
        name: '',
        code: '',
        type: '',
        parentId: '',
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [definitionToDelete, setDefinitionToDelete] = useState<string | null>(null);

    const handleDropdownChange = (selected: { value: string | number; label: string }) => {
        setSelectedEnum(selected.value as number);
    };

    const handleDefinitionTypeChange = (selected: { value: string | number; label: string }) => {
        const typeValue = selected.value !== null ? String(selected.value) : '';
        setDefinitionType(Number(selected.value));
        setNewDefinition((prev) => ({...prev, type: typeValue}));
    };

    const handleParentDefinitionChange = (selected: { value: string | number | null; label: string }) => {
        const parentIdValue = selected.value !== null ? String(selected.value) : '';
        setSelectedParentDefinition(selected.value !== null ? Number(selected.value) : null);
        setNewDefinition((prev) => ({...prev, parentId: parentIdValue}));
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setNewDefinition((prev) => ({...prev, name: value}));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedEnum !== null) {
                try {
                    const data = await fetchDefinitions(selectedEnum);
                    setDefinitions(Array.isArray(data) ? data : []);
                } catch (error) {
                    console.error('Error fetching definitions:', error);
                    setDefinitions([]);
                }
            }
        };
        fetchData().then(r => r);
    }, [selectedEnum]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedData = await fetchEnumDefinitions();
                setDefinitionEnum(Array.isArray(formattedData) ? formattedData : []);
            } catch (error) {
                console.error('Error fetching enum definitions:', error);
                setDefinitionEnum([]);
            }
        };
        fetchData().then(r => r);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (definitionType !== null && definitionType === 2) {
                try {
                    const formattedData = await fetchParentDefinitions();
                    setParentDefinitions(Array.isArray(formattedData) ? formattedData : []);
                } catch (error) {
                    console.error('Error fetching parent definitions:', error);
                    setParentDefinitions([]);
                }
            }
        };
        fetchData().then(r => r);
    }, [definitionType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name: newDefinition.name.trim(),
            code: newDefinition.code.trim(),
            type: Number(newDefinition.type),
            parentId: newDefinition.parentId.trim() || null,
        };
        try {
            const def = await createDefinition(payload);
            setDefinitions((prev) => [...prev, def]);
            setModalOpen(false);
        } catch (error) {
            console.error('Error creating definition:', error);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDefinitionToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (definitionToDelete !== null) {
            try {
                await deleteDefinition(definitionToDelete);
                setDefinitions((prev) => prev.filter((def) => def.id !== definitionToDelete));
                setDeleteModalOpen(false);
                setDefinitionToDelete(null);
            } catch (error) {
                console.error('Error deleting definition:', error);
            }
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setDefinitionToDelete(null);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tanım Listesi"/>

            <div className="flex min-h-screen flex-col gap-10">
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={handleOpenModal}
                        className="inline-flex items-center justify-center gap-2.5 bg-primary py-2.5 text-center font-bold text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
                    >
                        Tanım Ekle
                    </button>
                </div>

                <div className="mb-4">
                    <Dropdown
                        options={definitionEnum}
                        placeholder="Bir Tanım Tipi Seçin"
                        onChange={handleDropdownChange}
                    />
                </div>

                <div
                    className="overflow-x-auto rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <table className="w-full min-w-max table-auto">
                        <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-bold text-black dark:text-white xl:pl-11">
                                Üst Eleman
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-bold text-black dark:text-white">
                                Adı
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-bold text-black dark:text-white">
                                Tanım Tipi
                            </th>
                            <th className="px-4 py-4 font-bold text-black dark:text-white"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(definitions) && definitions.length > 0 ? (
                            definitions.map((definition, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {definition.parentName}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <h5 className="font-medium text-black dark:text-white">{definition.name}</h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {definition.typeText}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-amber-500">
                                                <FilePenLine/>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(definition.id)}
                                                className="hover:text-red-500"
                                            >
                                                <Trash2/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-5 text-center text-gray-500">
                                    Gösterilecek tanım bulunamadı.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tanım Ekleme Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 mt-25 flex items-start justify-center bg-gray-500 bg-opacity-50 dark:bg-black dark:bg-opacity-70">
                    <div className="z-50 w-full max-w-4xl rounded-lg bg-white p-10 shadow-lg dark:bg-boxdark">
                        <h2 className="text-2xl font-semibold text-black dark:text-white">Yeni Tanım Ekle</h2>
                        <hr className="my-5 border-t-2 border-gray-300 dark:border-gray-700"/>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Dropdown
                                    options={definitionEnum}
                                    placeholder="Bir Tanım Tipi Seçin"
                                    onChange={handleDefinitionTypeChange}
                                />
                            </div>
                            <div className="mt-6">
                                <input
                                    type="text"
                                    placeholder="Tanım adı girin"
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            {definitionType === 3 && (
                                <div className="mt-6">
                                    <input
                                        type="text"
                                        placeholder="Tanım kodu girin"
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            )}
                            {definitionType === 2 && (
                                <div className="mt-6">
                                    <Dropdown
                                        options={parentDefinitions}
                                        placeholder="Bir Üst Eleman Seçin"
                                        onChange={handleParentDefinitionChange}
                                    />
                                </div>
                            )}
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="rounded-md bg-gray-500 px-8 py-3 text-white hover:bg-gray-600"
                                >
                                    Kapat
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-500 px-8 py-3 text-white hover:bg-blue-600"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Silme Onay Modalı */}
            {deleteModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 dark:bg-black dark:bg-opacity-70">
                    <div className="z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark">
                        <h2 className="text-xl font-semibold text-black dark:text-white">
                            Tanımı Silmek İstiyor Musunuz?
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
                        </p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={handleCloseDeleteModal}
                                className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
};

export default Definition;