"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { RefreshCcw } from "lucide-react";
import { OrganisationNode } from "@/types";
import { TreeNode } from "@/components/TreeNode";
import { fetchOrganisations } from "@/services/organisationService";

const Page = () => {
  const [organizationData, setOrganizationData] = useState<OrganisationNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📌 Pull data with parentId = null on first startup
  useEffect(() => {
    const loadOrganizations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchOrganisations();
        setOrganizationData(data);
      } catch (err) {
        setError("An error occurred while loading organizations.");
        console.error("Data retrieval error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const handleNodeClick = async (parentId: string | null) => {
    if (!parentId) return;

    try {
      const data = await fetchOrganisations(parentId);
      setOrganizationData((prev) => updateTree(prev, parentId, data));
    } catch (error) {
      setError("An error occurred while loading sub-organizations.");
      console.error("Sub-data retrieval error:", error);
    }
  };

  const renderTreeNode = (node: OrganisationNode) => (
    <TreeNode key={node.id} node={node} onClick={() => handleNodeClick(node.id)} />
  );

  if (loading) return <div className="p-6 text-center">Yükleniyor...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Organizasyon Şeması" />
      <div className="flex min-h-screen flex-col gap-10">
        <div className="mb-4 flex justify-end">
          <button className="inline-flex items-center justify-center gap-1.5 bg-primary py-1 text-sm font-medium text-white hover:bg-opacity-90 lg:px-3 xl:px-4">
            <RefreshCcw size={14} /> Güncelle
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div>{organizationData.map(renderTreeNode)}</div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;

function updateTree(
  tree: OrganisationNode[],
  parentId: string,
  newChildren: OrganisationNode[]
): OrganisationNode[] {
  return tree.map((node) => {
    if (node.id === parentId) {
      return { ...node, children: newChildren };
    }
    if (node.children) {
      return { ...node, children: updateTree(node.children, parentId, newChildren) };
    }
    return node;
  });
}