import React, { useEffect, useState } from "react";
import { Add_Template_Dialog, PageHeader } from "../../components";

import "../../styles/templates.css";

import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";

import { ReactComponent as PDF } from "../../assets/svg/icons/PDF_icon.svg";
import { ReactComponent as DOCX } from "../../assets/svg/icons/DOCX_icon.svg";
import { ReactComponent as XLSX } from "../../assets/svg/icons/XLSX_icon.svg";
import { deleteTemplate, getTemplatesData } from "../../utils";
import toast from "react-hot-toast";
import { LoadingInfinite } from "../../assets/svg";
import Swal from "sweetalert2";
import { cloudname, domain, template_File } from "../../constants";
import { Tooltip } from "@mui/material";
import noResult from "../../assets/images/noResult.png";

function Templates() {
  const [openAddTemplate, setOpenAddTemplate] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templatesToFilter, setTemplatesToFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optionYears, setOptionYears] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    search: "",
  });

  useEffect(() => {
    document.title = `Templates`;
    getTemplates();
  }, []);

  const getTemplates = async () => {
    setIsLoading(true);
    const res = await getTemplatesData();

    if (res?.status === 200) {
      setIsLoading(false);
      if (res.data?.hasData === true) {
        setTemplatesToFilter(res.data?.templates);
      } else {
        setTemplatesToFilter([]);
      }
    } else {
      toast.error("Failed fetching template data");
    }
  };

  const handleDeleteTemplate = (
    template_id,
    date_Added,
    file_Name,
    public_id
  ) => {
    Swal.fire({
      icon: "question",
      iconColor: "#FF8911",
      text: "Delete this template? Continue?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#FF8911",
      cancelButtonColor: "#3A3535",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.loading("Please wait...");
        const res = await deleteTemplate({
          template_id: template_id,
          date_Added: date_Added,
          file_Name: file_Name,
          public_id: public_id,
        });
        toast.dismiss();
        if (res?.status === 200) {
          toast.success("Template deleted");
          getTemplates();
        } else {
          toast.error(res?.errorMessage);
        }
      } else {
        Swal.close();
      }
    });
  };

  useEffect(() => {
    if (templatesToFilter && templatesToFilter.length > 0) {
      const filteredTemplate = templatesToFilter
        .filter((templates) => templates.date_Added.includes(filters.year))
        .filter((templates) =>
          templates.template_Name
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        );

      let yearsSet = new Set();
      templatesToFilter.forEach((template) => {
        const year = template.date_Added.substring(0, 4);
        yearsSet.add(year);
      });

      setOptionYears(Array.from(yearsSet));
      setTemplates(filteredTemplate);
    } else {
      setTemplates(templatesToFilter);
    }
  }, [templatesToFilter, filters]);

  const handleDownload = async (props) => {
    toast.loading("Please wait...");
    const url = `${template_File}/${props.date_Added}-${props.template_Name}`;
    try {
      // Fetch the file as a Blob
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = props.template_Name;

      document.body.appendChild(link);
      link.click();
      toast.dismiss();
      toast.success("Download started");

      document.body.removeChild(link);

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      toast.error("An error occured while trying to download the file");
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <section id="Templates" className="Templates">
      {/* Template Add Dialog */}
      <Add_Template_Dialog
        openAddTemplate={openAddTemplate}
        closeAddTemplate={setOpenAddTemplate}
        getTemplates={getTemplates}
      />

      <div className="wrapper">
        <PageHeader page={"Templates"} />
        <div className="Templates_Container">
          {/* Actions */}
          <div className="Actions">
            <div className="Add_Template">
              <button onClick={() => setOpenAddTemplate(true)}>
                <MdIcons.MdOutlineAdd size={"20px"} /> ADD NEW TEMPLATE
              </button>
              <div className="Year_Select">
                <div className="Select_Icon">
                  <MdIcons.MdCalendarMonth className="Icon" id="Icon" />
                </div>
                <select
                  name="Year"
                  id="Year"
                  onChange={(e) =>
                    setFilters({ ...filters, year: e.target.value })
                  }
                >
                  <option value="">All Templates</option>
                  {optionYears.length > 0 &&
                    optionYears.map((year, index) => (
                      <option key={`${index}-${year}`} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="Search_Template">
              <div className="Year_Select">
                <div className="Select_Icon">
                  <MdIcons.MdCalendarMonth className="Icon" id="Icon" />
                </div>
                <select
                  name="Year"
                  id="Year"
                  onChange={(e) =>
                    setFilters({ ...filters, year: e.target.value })
                  }
                >
                  <option value="">All Templates</option>
                  {optionYears.length > 0 &&
                    optionYears.map((year, index) => (
                      <option key={`${index}-${year}`} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              </div>
              <div className="Input_Group">
                <div className="Custom_Search">
                  <div className="Icon">
                    <IoIcons.IoIosSearch size={"20px"} />
                  </div>
                  <input
                    className="Input"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="Templates_Grid">
            {!isLoading ? (
              <>
                {/* Template Item */}
                {templates.length > 0 ? (
                  <div className="Grid_Container">
                    {templates.map((template) => (
                      <div className="Template_Item" key={template.template_id}>
                        <div className="Template_Icon">
                          <div className="Icon">
                            {template.template_Name.endsWith(".pdf") ? (
                              <PDF />
                            ) : template.template_Name.endsWith(".doc") ||
                              template.template_Name.endsWith(".docx") ? (
                              <DOCX />
                            ) : (
                              (template.template_Name.endsWith(".xls") ||
                                template.template_Name.endsWith(".xlsx")) && (
                                <XLSX />
                              )
                            )}
                          </div>
                        </div>

                        <div className="Template_Bottom">
                          <div className="Template_Label">
                            <Tooltip title={template.template_Name}>
                              <p className="Name">{template.template_Name}</p>
                            </Tooltip>
                            <p className="Year">
                              {template.date_Added.substring(0, 4)}
                            </p>
                          </div>
                          <div className="Template_Actions">
                            <button
                              onClick={() => {
                                handleDownload({
                                  date_Added: template.date_Added,
                                  template_Name: template.template_Name,
                                });
                              }}
                            >
                              Download
                            </button>

                            <span
                              onClick={() =>
                                handleDeleteTemplate(
                                  template.template_id,
                                  template.date_Added,
                                  template.template_Name,
                                  template.public_id
                                )
                              }
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="Empty">
                    <div className="Icon">
                      <img src={noResult} alt="No result" />
                    </div>
                    <div className="Label">
                      <p className="Main">NO TEMPLATES FOUND!</p>
                      <p className="Sub">Click the add new template button.</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="Loader">
                <LoadingInfinite width="100px" height="100px" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Templates;
