"use client";
import Loading from "@/app/loading";
import NoDataFound from "@/app/noDataFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

const IssueCard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIssues = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/submitIssue",
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await res.json();
      setIssues(data.data); // Store fetched issues
    } catch (err) {
      console.error(err);
      setError("Error fetching issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteIssue = async (id) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/submitIssue?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete issue");
      }

      // Remove the deleted issue from the state
      setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== id));

      Swal.fire("Completed!", "Issue has been Completed.", "success");
    } catch (err) {
      console.error("Error deleting issue:", err);
      Swal.fire("Error", "Failed to delete issue. Please try again.", "error");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#135276",
      cancelButtonColor: "#BDBDBD",
      confirmButtonText: "Yes, Completed!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteIssue(id);
      }
    });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-lg text-red-500">{error}</div>
    );
  }

  // Sort issues by createdAt in ascending order (oldest first)
  const sortedIssues = [...issues].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div>
      <Card className=" m-4 mt-10 md:mt-0">
        <CardHeader>
          <CardTitle>Support Issues {issues.length}</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedIssues.length === 0 ? (
            <div>
              <NoDataFound />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table border my-4">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>#</th>
                    <th>Issue Type</th>
                    <th>Issue Description</th>
                    <th>Student Info</th>
                    <th>Submitted Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedIssues.map((issue, index) => (
                    <tr
                      key={issue._id}
                      className="transition-all ease-in-out duration-300 hover:rounded-md ">
                      <td>{index + 1}</td>
                      <td>{issue.selectedOption}</td>
                      <td>{issue.issueText}</td>

                      <td>
                        <h2>{issue.studentName}</h2>
                        <h3>{issue.studentEmail}</h3>
                      </td>
                      <td>{new Date(issue.createdAt).toLocaleString()}</td>
                      <td>
                        <Button
                          onClick={() => confirmDelete(issue._id)}
                          className="bg-secondary">
                          Complete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueCard;
