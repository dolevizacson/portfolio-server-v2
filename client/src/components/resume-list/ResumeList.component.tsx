import * as React from 'react';
import { endPoints } from '../../common/constants/end-points.constants';
import { AnimatePresence } from 'framer-motion';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import {
  useDeleteResumeMutation,
  useGetActiveResumeQuery,
  useGetResumeQuery,
  useToggleResumeMutation,
} from '../../services/resume/resume.service';
import NewResumeForm from '../new-resume-form/NewResumeForm.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import LoadingError from '../loading-error/LoadingError.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import CenterContent from '../center-content/CenterContent.component';
import AppModal from '../app-modal/AppModal.component';

import * as style from './style/resume-list.style';

const ResumeList = (): JSX.Element => {
  const { data: isLoggedIn, isFetching: loggedInIsFetching } =
    useIsLoggedInQuery();
  const [deleteResume, deleteResumeResponse] = useDeleteResumeMutation();
  const [toggleResume, toggleResumeResponse] = useToggleResumeMutation();

  const {
    data: resumeData,
    isLoading: resumeIsLoading,
    isError: resumeIsError,
    refetch: resumeRefetch,
  } = useGetResumeQuery(undefined, {
    skip: !!!isLoggedIn,
  });

  const {
    data: activeResumeData,
    isLoading: activeResumeIsLoading,
    isError: activeResumeIsError,
    refetch: activeResumeRefetch,
  } = useGetActiveResumeQuery(undefined, {
    skip: !!isLoggedIn,
  });

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const resumeList = React.useMemo(
    () => resumeData || activeResumeData,
    [resumeData, activeResumeData]
  );

  const refetchFunction = React.useMemo(
    () => (!!isLoggedIn ? resumeRefetch : activeResumeRefetch),
    [isLoggedIn, resumeRefetch, activeResumeRefetch]
  );

  React.useEffect(() => {
    if (deleteResumeResponse.isSuccess || deleteResumeResponse.isError) {
      setShowDeleteModal(false);
    }
  }, [deleteResumeResponse]);

  return (
    <LoadingErrorContainer
      loadingObject={{
        isTrue: resumeIsLoading || activeResumeIsLoading || loggedInIsFetching,
        component: <Loading />,
      }}
      errorObject={{
        isTrue: resumeIsError || activeResumeIsError,
        component: <LoadingError fixButton={{ onClick: refetchFunction }} />,
      }}
    >
      <style.ResumeList>
        <OnScreenNotification
          messages={[
            {
              isShow: toggleResumeResponse.isLoading,
              messageText: 'toggle resume',
            },
            {
              isShow: toggleResumeResponse.isError,
              messageText: 'toggle resume error',
              closeAfter: 5,
            },
            {
              isShow: deleteResumeResponse.isLoading,
              messageText: 'delete resume',
            },
            {
              isShow: deleteResumeResponse.isError,
              messageText: 'delete resume error',
              closeAfter: 5,
            },
          ]}
        />
        {resumeList && resumeList.length > 0 && (
          <style.ResumeListContainer>
            <style.ResumeListHeader>get my resume</style.ResumeListHeader>
            <CenterContent size={75}>
              <style.ResumeContainer>
                {resumeList?.map((resume) => {
                  return (
                    <style.Resume key={resume._id}>
                      <style.ResumeDownLoad
                        href={`${endPoints.baseUrl}/${endPoints.resume}/${resume._id}`}
                        download
                      >
                        <style.ResumeDownLoadIcon />
                        <style.ResumeFileName>
                          {resume.name}
                        </style.ResumeFileName>
                      </style.ResumeDownLoad>
                      {isLoggedIn && (
                        <>
                          <style.ResumeButton
                            type="button"
                            onClick={() => toggleResume(resume._id)}
                          >
                            toggle{' '}
                            <AnimatePresence initial={false} exitBeforeEnter>
                              {resume?.isActive ? (
                                <style.ButtonText key="off">
                                  off
                                </style.ButtonText>
                              ) : (
                                <style.ButtonText key="on">on</style.ButtonText>
                              )}
                            </AnimatePresence>
                          </style.ResumeButton>
                          <style.ResumeButton
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                          >
                            delete
                          </style.ResumeButton>
                          <AppModal
                            showModal={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                          >
                            <style.DeleteModalContainer>
                              <style.DeleteModalText>
                                are you sure ?
                              </style.DeleteModalText>
                              <style.DeleteModalButtonContainer>
                                <style.ModalButton
                                  onClick={() => setShowDeleteModal(false)}
                                >
                                  cancel
                                </style.ModalButton>
                                <style.ModalButton
                                  onClick={() => deleteResume(resume._id)}
                                >
                                  delete
                                </style.ModalButton>
                              </style.DeleteModalButtonContainer>
                            </style.DeleteModalContainer>
                          </AppModal>
                        </>
                      )}
                    </style.Resume>
                  );
                })}
              </style.ResumeContainer>
            </CenterContent>
          </style.ResumeListContainer>
        )}
        {isLoggedIn && <NewResumeForm />}
      </style.ResumeList>
    </LoadingErrorContainer>
  );
};

export default ResumeList;
