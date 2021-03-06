package com.spirovanni.blackshields.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Program.
 */
@Entity
@Table(name = "program")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "program")
public class Program implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "program_name", nullable = false)
    private String programName;

    @Lob
    @Column(name = "program_avator")
    private byte[] programAvator;

    @Column(name = "program_avator_content_type")
    private String programAvatorContentType;

    @Column(name = "program_description")
    private String programDescription;

    @Column(name = "program_price")
    private Long programPrice;

    @OneToMany(mappedBy = "program")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Resource> resources = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "program_courses",
               joinColumns = @JoinColumn(name="programs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="courses_id", referencedColumnName="id"))
    private Set<Course> courses = new HashSet<>();

    @ManyToMany(mappedBy = "programs")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Discipline> disciplines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProgramName() {
        return programName;
    }

    public Program programName(String programName) {
        this.programName = programName;
        return this;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public byte[] getProgramAvator() {
        return programAvator;
    }

    public Program programAvator(byte[] programAvator) {
        this.programAvator = programAvator;
        return this;
    }

    public void setProgramAvator(byte[] programAvator) {
        this.programAvator = programAvator;
    }

    public String getProgramAvatorContentType() {
        return programAvatorContentType;
    }

    public Program programAvatorContentType(String programAvatorContentType) {
        this.programAvatorContentType = programAvatorContentType;
        return this;
    }

    public void setProgramAvatorContentType(String programAvatorContentType) {
        this.programAvatorContentType = programAvatorContentType;
    }

    public String getProgramDescription() {
        return programDescription;
    }

    public Program programDescription(String programDescription) {
        this.programDescription = programDescription;
        return this;
    }

    public void setProgramDescription(String programDescription) {
        this.programDescription = programDescription;
    }

    public Long getProgramPrice() {
        return programPrice;
    }

    public Program programPrice(Long programPrice) {
        this.programPrice = programPrice;
        return this;
    }

    public void setProgramPrice(Long programPrice) {
        this.programPrice = programPrice;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public Program resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public Program addResources(Resource resource) {
        this.resources.add(resource);
        resource.setProgram(this);
        return this;
    }

    public Program removeResources(Resource resource) {
        this.resources.remove(resource);
        resource.setProgram(null);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Program courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Program addCourses(Course course) {
        this.courses.add(course);
        course.getPrograms().add(this);
        return this;
    }

    public Program removeCourses(Course course) {
        this.courses.remove(course);
        course.getPrograms().remove(this);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Discipline> getDisciplines() {
        return disciplines;
    }

    public Program disciplines(Set<Discipline> disciplines) {
        this.disciplines = disciplines;
        return this;
    }

    public Program addDisciplines(Discipline discipline) {
        this.disciplines.add(discipline);
        discipline.getPrograms().add(this);
        return this;
    }

    public Program removeDisciplines(Discipline discipline) {
        this.disciplines.remove(discipline);
        discipline.getPrograms().remove(this);
        return this;
    }

    public void setDisciplines(Set<Discipline> disciplines) {
        this.disciplines = disciplines;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Program program = (Program) o;
        if (program.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), program.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Program{" +
            "id=" + getId() +
            ", programName='" + getProgramName() + "'" +
            ", programAvator='" + getProgramAvator() + "'" +
            ", programAvatorContentType='" + programAvatorContentType + "'" +
            ", programDescription='" + getProgramDescription() + "'" +
            ", programPrice='" + getProgramPrice() + "'" +
            "}";
    }
}
