import * as React from 'react';
import {
  useFormContext,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from 'react-hook-form';

import { CreateBlogPost } from '../../common/interfaces/create-blog-post.interface';
import FormInput from '../form-input/FormInput.component';
import FormTextArea from '../form-text-area/FormTextArea.component';
import ImageGallery from '../image-gallery/ImageGallery.component';

import * as style from './style/blog-post-form.style';

type BlogPostFormProps<T, R> = {
  paragraphs: FieldArrayWithId<CreateBlogPost, 'paragraphs', 'id'>[];
  removeParagraph: UseFieldArrayRemove;
  deleteButtonObject: (
    | {
        deleteFunction: (arg: T) => R;
        deleteData: T[];
      }
    | undefined
  )[];
};

const BlogPostForm = <T, R>({
  paragraphs,
  removeParagraph,
  deleteButtonObject,
}: BlogPostFormProps<T, R>): JSX.Element => {
  const {
    setError,
    formState: { errors, isSubmitted },
  } = useFormContext();

  React.useEffect(() => {
    if (!paragraphs.length && isSubmitted) {
      setError('paragraphs', {
        type: 'min',
        message: 'min of 1 paragraph is required',
      });
    }
  }, [isSubmitted, paragraphs.length, setError]);

  return (
    <style.BlogPostForm>
      <style.BlogPostFormFormContainer>
        <FormInput fieldName="header" />

        <FormTextArea fieldName="summery" />
      </style.BlogPostFormFormContainer>

      {(paragraphs.length > 0 || errors.paragraphs?.type === 'min') && (
        <style.BlogPostFormParagraphsListContainer>
          <style.BlogPostFormParagraphListContainerHeader>
            paragraphs
            <style.BlogPostFormParagraphListContainerError>
              {errors.paragraphs?.message && <style.ErrorIcon />}
              {errors.paragraphs?.message}
            </style.BlogPostFormParagraphListContainerError>
          </style.BlogPostFormParagraphListContainerHeader>
          {paragraphs.map((field, index) => (
            <style.BlogPostFormParagraphContainerAndSeparatorContainer
              key={field.id}
            >
              <style.BlogPostFormParagraphContainer>
                <FormInput
                  fieldName={`paragraphs.${index}.header`}
                  labelName="header"
                  error={errors.paragraphs?.[index]?.header?.message}
                />

                <FormTextArea
                  fieldName={`paragraphs.${index}.body`}
                  labelName="body"
                  error={errors.paragraphs?.[index]?.body?.message}
                />
                <style.BlogPostFormImageGalleryContainer>
                  {parseInt(`${field?.gallery?.length}`) > 0 &&
                    field?.gallery &&
                    deleteButtonObject[index] !== undefined && (
                      <ImageGallery
                        images={field.gallery}
                        imageGallerySizing={{ imageSize: 200, gapSize: 15 }}
                        deleteButtonObject={{
                          deleteFunction:
                            //@ts-expect-error
                            deleteButtonObject[index].deleteFunction,
                          //@ts-expect-error
                          deleteData: deleteButtonObject[index].deleteData,
                        }}
                      />
                    )}
                </style.BlogPostFormImageGalleryContainer>
                <style.BlogPostFormRemoveParagraphErrorContainer>
                  <style.BlogPostFormRemoveParagraphError>
                    {errors.paragraphs?.[index]?.message && <style.ErrorIcon />}
                    {errors.paragraphs?.[index]?.message}
                  </style.BlogPostFormRemoveParagraphError>
                  <style.BlogPostFormRemoveParagraphButton
                    type="button"
                    onClick={() => {
                      const length = paragraphs?.[index]?.gallery?.length;
                      if (length !== undefined && length > 0) {
                        setError(`paragraphs.${index}`, {
                          type: 'required',
                          message:
                            'must delete images before removing paragraph',
                        });
                      } else {
                        removeParagraph(index);
                      }
                    }}
                  >
                    remove paragraph
                  </style.BlogPostFormRemoveParagraphButton>
                </style.BlogPostFormRemoveParagraphErrorContainer>
              </style.BlogPostFormParagraphContainer>
            </style.BlogPostFormParagraphContainerAndSeparatorContainer>
          ))}
        </style.BlogPostFormParagraphsListContainer>
      )}
      <style.BlogPostFormConclusionContainer>
        <FormInput
          fieldName="conclusion.header"
          labelName="conclusion header"
        />

        <FormTextArea fieldName="conclusion.body" labelName="conclusion body" />
      </style.BlogPostFormConclusionContainer>
    </style.BlogPostForm>
  );
};

export default BlogPostForm;
