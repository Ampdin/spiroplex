package com.spirovanni.blackshields.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.spirovanni.blackshields.domain.enumeration.ResourceType;

/**
 * A Resource.
 */
@Entity
@Table(name = "resource")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "resource")
public class Resource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "resource_name")
    private String resourceName;

    @Lob
    @Column(name = "resource_avator")
    private byte[] resourceAvator;

    @Column(name = "resource_avator_content_type")
    private String resourceAvatorContentType;

    @Column(name = "resource_description")
    private String resourceDescription;

    @Column(name = "resource_url")
    private String resourceURL;

    @Column(name = "resource_preview_image")
    private String resourcePreviewImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "resource_type")
    private ResourceType resourceType;

    @Column(name = "weight")
    private Integer weight;

    @ManyToOne
    private Discipline discipline;

    @ManyToOne
    private Program program;

    @ManyToOne
    private Course course;

    @ManyToOne
    private Lesson lesson;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResourceName() {
        return resourceName;
    }

    public Resource resourceName(String resourceName) {
        this.resourceName = resourceName;
        return this;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public byte[] getResourceAvator() {
        return resourceAvator;
    }

    public Resource resourceAvator(byte[] resourceAvator) {
        this.resourceAvator = resourceAvator;
        return this;
    }

    public void setResourceAvator(byte[] resourceAvator) {
        this.resourceAvator = resourceAvator;
    }

    public String getResourceAvatorContentType() {
        return resourceAvatorContentType;
    }

    public Resource resourceAvatorContentType(String resourceAvatorContentType) {
        this.resourceAvatorContentType = resourceAvatorContentType;
        return this;
    }

    public void setResourceAvatorContentType(String resourceAvatorContentType) {
        this.resourceAvatorContentType = resourceAvatorContentType;
    }

    public String getResourceDescription() {
        return resourceDescription;
    }

    public Resource resourceDescription(String resourceDescription) {
        this.resourceDescription = resourceDescription;
        return this;
    }

    public void setResourceDescription(String resourceDescription) {
        this.resourceDescription = resourceDescription;
    }

    public String getResourceURL() {
        return resourceURL;
    }

    public Resource resourceURL(String resourceURL) {
        this.resourceURL = resourceURL;
        return this;
    }

    public void setResourceURL(String resourceURL) {
        this.resourceURL = resourceURL;
    }

    public String getResourcePreviewImage() {
        return resourcePreviewImage;
    }

    public Resource resourcePreviewImage(String resourcePreviewImage) {
        this.resourcePreviewImage = resourcePreviewImage;
        return this;
    }

    public void setResourcePreviewImage(String resourcePreviewImage) {
        this.resourcePreviewImage = resourcePreviewImage;
    }

    public ResourceType getResourceType() {
        return resourceType;
    }

    public Resource resourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
        return this;
    }

    public void setResourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
    }

    public Integer getWeight() {
        return weight;
    }

    public Resource weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Discipline getDiscipline() {
        return discipline;
    }

    public Resource discipline(Discipline discipline) {
        this.discipline = discipline;
        return this;
    }

    public void setDiscipline(Discipline discipline) {
        this.discipline = discipline;
    }

    public Program getProgram() {
        return program;
    }

    public Resource program(Program program) {
        this.program = program;
        return this;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public Course getCourse() {
        return course;
    }

    public Resource course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public Resource lesson(Lesson lesson) {
        this.lesson = lesson;
        return this;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
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
        Resource resource = (Resource) o;
        if (resource.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resource.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Resource{" +
            "id=" + getId() +
            ", resourceName='" + getResourceName() + "'" +
            ", resourceAvator='" + getResourceAvator() + "'" +
            ", resourceAvatorContentType='" + resourceAvatorContentType + "'" +
            ", resourceDescription='" + getResourceDescription() + "'" +
            ", resourceURL='" + getResourceURL() + "'" +
            ", resourcePreviewImage='" + getResourcePreviewImage() + "'" +
            ", resourceType='" + getResourceType() + "'" +
            ", weight='" + getWeight() + "'" +
            "}";
    }
}
